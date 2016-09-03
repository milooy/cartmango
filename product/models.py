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
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'사용자',
                               related_name='my_product')
    mall = models.ForeignKey('Mall', verbose_name=u'쇼핑몰',
                             related_name='mall_product')
    tags = TaggableManager()

    # 정보
    name = models.CharField(u'제목', max_length=200)
    url = models.CharField(u'링크', max_length=300)
    price = models.PositiveIntegerField(u'가격', default=0, null=True, blank=True)
    created = models.DateTimeField(u'생성일', default=timezone.now)
    thumbnail = ResizedImageField(
        u'썸네일',
        size=[900, 900], quality=80,
        null=True, blank=True,
        upload_to='%Y/%m/%d',
    )


class Mall(models.Model):
    name = models.CharField(u'쇼핑몰 이름', max_length=200)
