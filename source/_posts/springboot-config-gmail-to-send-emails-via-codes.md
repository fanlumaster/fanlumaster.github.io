---
title: springboot config gmail to send emails via codes
date: 2023-08-20 21:30:28
tags:
- springboot
- Java
categories:
index_img: https://i.imgur.com/aS8zwi6.png
banner_img: https://i.imgur.com/aS8zwi6.png
---

项目中需要用到 springboot 集成的这个通过代码发送邮件的功能，所以，这里就利用这个小 demo 来实验一下。结果是好的，虽然是 gmail，但是似乎并不需要额外去配置代理的，只要把系统的代理挂上就可以了，我这里使用的是 clash for windows 的 rule 模式，在程序运行的时候，可以看到相应的流量是走的这个代理的。

那么，这样的话，这个配置其实就没有什么问题了。按部就班地去进行配置即可。

## 准备工作

首先，我们要获取谷歌的 GMail 的授权码。登录 GMail 的网页版，然后，在设置中打开 POP 和 IMAP 的接入，

![](https://i.imgur.com/kktA64x.png)

然后进入这里去设置，

![](https://i.imgur.com/szICNPT.png)

然后，生成一个应用专用密码，这个密码会在下面的配置中用到。

然后，这里可能有误，如果有误的话，就麻烦一下移步谷歌搜索，因为这里我是事后才来记录的。

## 正式开干

在 IDEA 中建立一个 springboot 程序，默认只需要添加一个 mail sender 的库即可，

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

然后就是我们的 `properties` 配置，

```
spring.mail.host=smtp.gmail.com
spring.mail.port=587
# replace with your own gmail here
spring.mail.username=xxx@gmail.com
# replace with your own password here
spring.mail.password=xxxxxxxxxxxxxxxxxx
# replace with your own gmail here, the same with above
spring.mail.from=xxx@gmail.com
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

我这里用到这么多配置就可以了，然后，如果想要更加细致的配置信息，可以去找 springboot 的文档，以及，java 的[文档](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html)，毕竟，springboot 也只是对原生的 java mail 进行一次再封装。

然后，我们可以就可以写程序了，这里的结构很简单，主要就三个程序文件，其中一个是测试类，

![](https://i.imgur.com/GFoH1de.png)

1、`EmailUtilService.java`，

```java
public interface EmailUtilService {
    /**
     * 发送文本文件
     * @param to       收件人
     * @param subject  主题
     * @param content  内容
     */
    void sendSimpleMail(String to, String subject, String content);
}
```

2、`EmailUtilServiceImpl.java`，

```java
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailUtilServiceImpl implements EmailUtilService {
    @Resource
    private JavaMailSender mailSender;

    @Value("${spring.mail.from}")
    private String from;

    @Override
    public void sendSimpleMail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }
}
```

3、`EmailUtilServiceImplTest`，

```java
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailUtilServiceImplTest {

    @Resource
    private EmailUtilService emailUtilService;

    @Test
    void sendSimpleMail() {
        String to = "xxxxxxxxx@gmail.com"; // replace with your own email
        String subject = "spring mail test";
        String content = "This is an email from spring-mail, just a test.";
        emailUtilService.sendSimpleMail(to, subject, content);
    }
}
```

运行以下这里的测试的话，就可以发现可以正常发送邮件了。

如果你想要这个 demo 的完整文件的话，那么，可以访问这个 GitHub 仓库：

<https://github.com/fanlumaster/mail-demo>

