from django.contrib import admin

# Configure the admin site for this app
# There is a LOT in the documentation
#   Useful later but not something I care too much about

from .models import Meetup, Location, Organizer, Participant

# How to show up on the admin page
# you have a tuple with ()
# Then filter them with list_filter
# The admin is now filtered that way. Its crazy how much automatic stuff can happen
#   I still like Next.js better for front end
# prepopulated_fields can pre populate fields on the admin page 'slug' is a model in the DB table
class MeetuAdmin(admin.ModelAdmin):
  list_display = ('title', 'date', 'location')
  list_filter = ('location', 'date')
  prepopulated_fields = {'slug': ('title',)}

# What is on the admit meetup page
# Register your models here.
# So they can be seen at the admin part of the site
admin.site.register(Meetup, MeetuAdmin)
admin.site.register(Organizer)
admin.site.register(Location)
admin.site.register(Participant)

