# Django builds the form for you!!
# Based on the stuff needed from the model

from django import forms

from .models import Participant

# class RegistrationForm(forms.ModelForm):
#   class Meta:

#     # This build by using the model to make the form
#     # model = Participant
#     # This you can restrict the fields
#     # fields = ['first_name', 'last_name', 'email']

class RegistrationForm(forms.Form):
  fish_name = forms.CharField(max_length=100)
  last_name = forms.CharField(max_length=100)
  email = forms.EmailField(label='Your email')