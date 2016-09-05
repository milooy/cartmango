from django.utils import timezone
from django.conf import settings
from django.db import models
from django_resized import ResizedImageField
from taggit.managers import TaggableManager


class Product(models.Model):
    class Meta:
        verbose_name = u'상품'
        verbose_name_plural = verbose_name
        ordering = ["-created"]

    # 관계
    user = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name=u'사용자', blank=True)
    mall = models.ForeignKey('Mall', verbose_name=u'쇼핑몰',
                             related_name='mall_product')
    tags = TaggableManager()

    # 정보
    name = models.CharField(u'상품명', max_length=200)
    url = models.CharField(u'링크', max_length=300)
    price = models.PositiveIntegerField(u'가격', default=0, null=True, blank=True)
    created = models.DateTimeField(u'생성일', default=timezone.now)
    thumbnail_url = models.CharField(u'썸네일 url', max_length=1000, null=True, blank=True)
    thumbnail = ResizedImageField(
        u'썸네일',
        size=[900, 900], quality=80,
        crop=['middle', 'center'],
        null=True, blank=True,
        upload_to='product/%Y/%m/%d',
    )

    def __str__(self):
        return self.name + self.mall.name


class Mall(models.Model):
    name = models.CharField(u'쇼핑몰 이름', max_length=200)
    thumbnail = ResizedImageField(
        u'썸네일',
        size=[900, 900], quality=80,
        null=True, blank=True,
        upload_to='mall/%Y/%m/%d',
    )

    def __str__(self):
        return self.name

