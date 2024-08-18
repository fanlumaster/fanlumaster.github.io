---
title: Django 学习笔记
date: 2022-02-14 16:11:13
tags:
- Python
- Django
categories:
- Django
index_img: https://i.imgur.com/nZ7w3Ou.png
banner_img: https://i.imgur.com/nZ7w3Ou.png
---

# Bugs 解决记录

## django.template.exceptions.TemplateDoesNotExist

[StackOverflow](https://stackoverflow.com/questions/65425433/django-template-exceptions-templatedoesnotexist-hello)


## dash 符号命令问题

前端：

```html
<input type="text" name="search-area" value="{{search_input}}">
```

后端：

```py
context['search_input'] = search_input
```

上面这样是对的，但是如果把下划线 `_` 换成 `-` 就会出错。这个应该是命名规范的问题。

## Django 重命名项目名(根目录)

这里使用的开发工具是 VSCode。

我们在修改根目录名称和根目录下的同名文件夹之后，我们可以利用 VSCode 的全局替换把所有的旧文件名给新文件名即可。

## Django 查询子类问题

`models` 中的代码如下：

```py
class Project(models.Model):
    # owner = models.ForeignKey('auth.User', related_name='projects', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    # featured_image =
    demo_link = models.CharField(max_length=1000, null=True, blank=True)
    source_link = models.CharField(max_length=1000, null=True, blank=True)
    vote_totle = models.IntegerField(default=0)
    vote_ratio = models.IntegerField(default=0)
    tags = models.ManyToManyField('Tag', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.title


class Review(models.Model):

    VOTE_TYPE = (
        ('up', 'up'),
        ('down', 'down'),
    )

    # owner
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True)
    body = models.TextField(null=True, blank=True)
    value = models.CharField(max_length=50, choices=VOTE_TYPE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.value
```

这里是想要以 `Project` 来查询 `reveiw`，其实 `Project` 是 `Review` 的外键，这里查询的语法比较特殊，和 `tags` 这种多对多的查询是不一样的，正确的语句如下：

```py
def project(request, pk):
    projectObj = Project.objects.get(id=pk)
    tags = projectObj.tags.all() # 查询 tags
    reviews = projectObj.review_set.all() # 查询 reviews
    context = {'project': projectObj, 'tags': tags, 'reviews': reviews}
    return render(request, 'projects/single-project.html', context)
```

其实，我们可以设置一下外键的 `related_name`，就可以像查询 `tags` 一样查询 `reviews` 了：

```py
project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True, related_name='reviews')
```

```py
reviews = projectObj.reviews.all()
```

# Some 知识点

关于 `form` 表单，如果 `action` 的值为空的话，那么 `POST` 提交的东西会被提交到当前的 `URL`，即会被送到当前的 `URL` 对应的 `views` 中的方法进行处理。

```html
<form method="POST" action="">
</form>
```