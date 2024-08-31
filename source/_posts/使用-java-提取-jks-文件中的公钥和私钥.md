---
title: 使用 java 提取 jks 文件中的公钥和私钥
date: 2023-09-02 21:20:01
updated: 2023-09-23 14:02:01
tags:
- java
categories:
index_img: https://i.imgur.com/PxhfxMc.png
banner_img: https://i.imgur.com/PxhfxMc.png
---

注意，这个代码只能提取标准 jks 文件中的公钥和私钥，如果是使用 jdk17 中的 keytool 生成的 jks 文件，本文的代码是不生效的，而且，在其他的情况都正确的情况下，会出现以下的错误，

```shell
Get Key failed: Given final block not properly padded. Such issues can arise if a bad key is used during decryption jks file
```

我们用 jdk17 版本的 keytool 生成的密钥库类型为 PKCS12，而 PKCS12 只有 storepass 属性，没有 keypass，因此我们单独指定密钥条目的密码，即填入的 keypass 将不会生效，签名的时候也会无法正常按照我们创建时填写的 keypass 来读取我们的密钥。

我这里使用的 jks 文件是使用 jdk8 中的 keytool 生成的。

代码写出来很简单，

```java
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Security;
import java.security.cert.Certificate;
import java.util.Base64;

public class KeyStoreExtract {
    public static void main(String[] args) {
        String jksFile = "C:\\EDisk\\JavaCodes\\certificate\\jks_demo\\fanyfull.jks";
        String alias = "fanyfull";
        String storepass = "ffsp123456";
        String keypass = "ffkp123456";

        try {
            FileInputStream fis = new FileInputStream(jksFile);
            KeyStore keyStore = KeyStore.getInstance("JKS");
            keyStore.load(fis, storepass.toCharArray());
            fis.close();

            Security.addProvider(new BouncyCastleProvider());

            PrivateKey privateKey = (PrivateKey) keyStore.getKey(alias, keypass.toCharArray());
            Certificate cert = keyStore.getCertificate(alias);
            PublicKey publicKey = cert.getPublicKey();

            String base64PrivateKey = Base64.getEncoder().encodeToString(privateKey.getEncoded());
            String base64Cert = Base64.getEncoder().encodeToString(cert.getEncoded());
            String base64PublicKey = Base64.getEncoder().encodeToString(publicKey.getEncoded());

            // public key
            System.out.println("-----BEGIN PUBLIC KEY-----");
            System.out.println(base64PublicKey);
            System.out.println("-----END PUBLIC KEY-----");

            // private key
            System.out.println("-----BEGIN PRIVATE KEY-----");
            System.out.println(base64PrivateKey);
            System.out.println("-----END PRIVATE KEY-----");

            // cert
            System.out.println("-----BEGIN CERTIFICATE-----");
            System.out.println(base64Cert);
            System.out.println("-----END CERTIFICATE-----");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

需要注意一点，这里还需要在 pom 文件里面添加一个库，

```xml
<dependency>
  <groupId>org.bouncycastle</groupId>
  <artifactId>bcprov-jdk18on</artifactId>
  <version>1.76</version>
</dependency>
```

完整的 pom 文件如下，

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.fan</groupId>
  <artifactId>extract_jks</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <name>extract_jks</name>
  <url>https://maven.apache.org</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <java.version>17</java.version>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>org.bouncycastle</groupId>
      <artifactId>bcprov-jdk18on</artifactId>
      <version>1.76</version>
    </dependency>
  </dependencies>
</project>
```

参考：

1、<https://www.cnblogs.com/simon-xie/p/17004614.html>

