from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


# Make the DB models
class Todo(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(200), nullable=False)
  date_created = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

  def __str__(self) -> str:
    return f'Task {self.id}'

# This is how you set up routes in flask
@app.route('/')
def index():
  # do NOT need to say folder template
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)