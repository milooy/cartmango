from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from .forms import SignupForm


def signup(request):
    signupform = SignupForm()
    if request.method == "POST":
        signupform = SignupForm(request.POST, request.FILES)
        if signupform.is_valid():
            user = signupform.save(commit=False)
            user.email = signupform.cleaned_data['email']
            user.avatar = signupform.clean_avatar()
            user.save()

            return HttpResponseRedirect(
                reverse("signup_ok")
            )

    return render(request, "signup.html", {
        "signupform": signupform,
    })
