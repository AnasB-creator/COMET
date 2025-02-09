from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
# @login_required
def reactApp(request):
    # print(request.user.email)
    return render(request, "home.html", 
                #   context={
        # "userEmail":request.user.email,
    # }
    )