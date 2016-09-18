from .models import List
from django import forms


class NewListForm(forms.ModelForm):
    class Meta:
        model = List
        fields = ('name', )
