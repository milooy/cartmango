from urllib.request import urlopen

from django.core.files.base import ContentFile
from social.utils import slugify

USER_FIELDS = ['email', 'nickname']


def create_user(strategy, details, user=None, *args, **kwargs):
    print(details)
    if user:
        return {'is_new': False}

    fields = {'email': details.get('email'), 'nickname': details.get('username')}

    if not fields:
        return

    return {
        'is_new': True,
        'user': strategy.create_user(**fields)
    }


def update_avatar(backend, response, uid, user, *args, **kwargs):
    if backend.name == 'facebook':
        url = "http://graph.facebook.com/%s/picture?type=large" % response['id']
        avatar = urlopen(url)
        user.avatar.save(slugify(user.email + "_social") + '.jpg', ContentFile(avatar.read()))
        user.save()
