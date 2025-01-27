from django.urls import path

from . import views

# MUST be urlpatterns exactly!!
urlpatterns = [
  #path("PATH", FUNCTION TO INVOKE)
  # Remmber that the "/meetups" beginning  in your urls.py for "dango_course_site"
   #our-domain.com/meetups -- add the / at the end for safety so the / and the other is fine
  path("", views.index, name="all-meetups"),
  path('<slug:meetup_slug>/success', views.confirm_registration, name='confirm-registration'),
  # dynamic based on teh meetup you are using
  # the <> makes it dynamic
  # the SLUG is for the url
  # The slug: this then enforces rules!
  # The name is a variable to hold the value of the URL
  # that you are on, it can then be used in the templates, any of them it looks like, to make relative paths
  path('<slug:meetup_slug>', views.meetup_details, name='meetup-detail')
]
