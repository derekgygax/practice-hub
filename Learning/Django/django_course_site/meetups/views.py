from django.shortcuts import render, redirect
from django.http import HttpResponse

from .models import Meetup, Participant
from .forms import RegistrationForm

# Create your views here.


def index(request):
  # return HttpResponse('Hello World')
  # render() creates HTTP response
  # two arguments
  #   -request
  #   -path to template relative to in the templates folder
  # the slug thing is important for SEO and stuff
  # The slug is what is going to be used for the url for details of that one in particular
  # like /meetups/a-first-meetup

  # The {} in the render() is where the details go

  # Query the DB you defined in models
  meetups = Meetup.objects.all() # get all instances of this class
  # meetups = Meetup.objects.all().order_by() # all and ordered
  return render(request, 'meetups/index.html', {
    'show_meetups': True,
    'meetups': meetups
  })


def meetup_details(request, meetup_slug):
  # DB for a specific one
  # the .get finds one, slug is in the model, meetup_slug is from the URL and is defined in urls.py
  
  try:

    selected_meetup = Meetup.objects.get(slug=meetup_slug)

    # Do different things for GET an POST
    if request.method == "GET":
      # Form that was built in Django
      registration_form = RegistrationForm()
    elif request.method == "POST":
      # Built in Django to process the form
      registration_form = RegistrationForm(request.POST)
      if registration_form.is_valid():
        # Because you are using the Participant model
        # in the registration form you can just call
        # save and it will save it to the DB corrctly
        # Save a new participant OR retrieve one that is already in the DB
        # participant = registration_form.save()
        # This is very easy
        # get the email from the form
        user_email = registration_form.cleaned_data['email']
        # Do DB stuff using the model directly. Look if exists, if so just return
        # if not create it. Returns object and was_created, OR if you do _ it just ignores it
        participant, _ = Participant.objects.get_or_create(email=user_email)
        # create the participant object
        # Now this needs to add to the meetup participant linker table
        selected_meetup.participants.add(participant)
        return redirect('confirm-registration', meetup_slug=meetup_slug)
        
    return render(request, 'meetups/meetup-details.html', {
      'meetup_found': True,
      'meetup': selected_meetup,
      'registration_form': registration_form,
      'organizer': selected_meetup.organizer
    })
  except Exception as exc:
    return render(request, 'meetups/meetup-details.html', {
      'meetup_found': False
    })
  
def confirm_registration(request, meetup_slug):

  selected_meetup = Meetup.objects.get(slug=meetup_slug)

  return render(request, 'meetups/registration-success.html', {
    'organizer': selected_meetup.organizer
  })