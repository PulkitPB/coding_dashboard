from django.urls import path
from .views import index
urlpatterns = [
    path('home/<str:leetcode_id>/<str:codechef_id>/<str:codeforces_id>/',index),
    path('',index),

]
