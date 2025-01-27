from django.utils import timezone
from django.db import models
# Remember this is for the database
# Create your models here.

# Remember the __str__ is like __repr__
# it is what is shown for you when you that model as a whole and not the contents with .blahblah
class Location(models.Model):
  name = models.CharField(max_length=200)
  address = models.CharField(max_length=300)

  def __str__(self) -> str:
    return f'{self.name} ({self.address})'
  
class Participant(models.Model):
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)

  def __str__(self) -> str:
    return self.email
  
class Organizer(models.Model):
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)

  def __str__(self) -> str:
    return f'{ self.first_name } { self.last_name }'

# models.Modle is a base class for a table in a databse
# slugField is the url thing
# store where the files are located, not the file
class Meetup(models.Model):
  title = models.CharField(max_length=200)
  date = models.DateField(default=timezone.now)
  slug = models.SlugField(unique=True)
  description = models.TextField()
  img = models.ImageField(upload_to="images")


  # One to Many links
  organizer = models.ForeignKey(Organizer, on_delete=models.CASCADE)
  location = models.ForeignKey(Location, on_delete=models.CASCADE)

  # link to participants (many to many) (could do in participant instead. ONLY one is enough)
  # This is making a linking table
  # it could be empty! with the blank=True if allowed to not have things there
  # the null=True does NOTHING with many to many but will do stuff for other ones
  participants = models.ManyToManyField(Participant, blank=True, null=True)

  # How it will show up with str like on admin page
  def __str__(self) -> str:
    return f'{self.title} - self.slug'