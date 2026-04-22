# Rishav Raj - Portfolio Website

A full-stack portfolio website built with Django backend and modern frontend technologies.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Contact Form**: Functional contact form with Django backend integration
- **Database Storage**: Contact submissions stored in SQLite database
- **Admin Panel**: Django admin interface to manage contact submissions
- **Email Notifications**: Automatic email notifications for new submissions
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, skill animations, and hover effects

## Tech Stack

### Backend
- **Django 4.2.7**: Web framework
- **SQLite**: Database
- **Python**: Programming language

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive features and animations
- **Inter Font**: Professional typography

## Project Structure

```
portfolio/
├── manage.py                 # Django management script
├── requirements.txt           # Python dependencies
├── README.md                # This file
├── portfolio_project/       # Django project settings
│   ├── __init__.py
│   ├── settings.py          # Project configuration
│   ├── urls.py             # Main URL patterns
│   ├── wsgi.py            # WSGI configuration
│   └── asgi.py            # ASGI configuration
├── contact/                # Django app for contact functionality
│   ├── __init__.py
│   ├── admin.py            # Admin interface configuration
│   ├── apps.py            # App configuration
│   ├── forms.py           # Contact form classes
│   ├── models.py          # Database models
│   ├── urls.py            # Contact app URL patterns
│   └── views.py          # View functions
├── templates/             # HTML templates
│   ├── base.html         # Base template
│   ├── index.html        # Home page
│   └── contact/
│       └── success.html   # Contact success page
└── static/               # Static files
    ├── css/
    │   └── styles.css    # Main stylesheet
    ├── js/
    │   └── script.js     # JavaScript functionality
    └── images/
        └── .gitkeep      # Images directory
```

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation Steps

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd portfolio
   ```

2. **Create and activate virtual environment**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure email settings** (Optional)
   - Open `portfolio_project/settings.py`
   - Update the following settings with your email credentials:
   ```python
   EMAIL_HOST = 'smtp.gmail.com'  # Your email provider
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your-email@gmail.com'
   EMAIL_HOST_PASSWORD = 'your-app-password'
   DEFAULT_FROM_EMAIL = 'your-email@gmail.com'
   ```

5. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser account** (for admin access)
   ```bash
   python manage.py createsuperuser
   ```
   - Follow the prompts to create your admin account

7. **Add your profile picture**
   - Place your profile picture as `static/images/profile.jpg`
   - Supported formats: JPG, PNG
   - Recommended size: 250x250 pixels

8. **Run the development server**
   ```bash
   python manage.py runserver
   ```

9. **Access the application**
   - Open your browser and go to: `http://127.0.0.1:8000`
   - Admin panel: `http://127.0.0.1:8000/admin`

## Usage

### Viewing Contact Submissions

1. **Via Admin Panel**:
   - Go to `http://127.0.0.1:8000/admin`
   - Login with your superuser credentials
   - Navigate to "Contact Submissions" section
   - View, edit, or mark submissions as read/unread

2. **Via Database**:
   - Contact submissions are stored in the `ContactSubmission` table
   - Fields: name, email, subject, message, created_at, is_read

### Customization

#### Updating Personal Information
- Edit `templates/index.html` to update:
  - Name and title
  - About section content
  - Experience details
  - Education information
  - Skills and projects

#### Styling
- Modify `static/css/styles.css` for visual changes
- CSS variables are defined at the top for easy customization

#### Adding New Sections
1. Create new section in `templates/index.html`
2. Add corresponding styles to `static/css/styles.css`
3. Update navigation menu if needed

## Features Details

### Contact Form
- **Validation**: Client-side and server-side validation
- **CSRF Protection**: Django CSRF token protection
- **AJAX Support**: Asynchronous form submission
- **Success Messages**: User-friendly feedback
- **Email Notifications**: Automatic email sending (if configured)

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 768px (tablet), 480px (mobile)
- **Flexible Grid**: CSS Grid and Flexbox layouts
- **Touch-Friendly**: Appropriate button and link sizes

### Performance
- **Optimized Images**: Proper image sizing and formats
- **Minified Assets**: CSS and JavaScript optimization
- **Lazy Loading**: Images load as needed
- **Smooth Animations**: Hardware-accelerated CSS

## Security

- **CSRF Protection**: All forms protected
- **SQL Injection Prevention**: Django ORM protection
- **XSS Protection**: Django template auto-escaping
- **Admin Security**: Password-protected admin panel

## Deployment

### For Production

1. **Update settings**:
   ```python
   DEBUG = False
   ALLOWED_HOSTS = ['yourdomain.com']
   SECRET_KEY = 'your-secure-secret-key'
   ```

2. **Collect static files**:
   ```bash
   python manage.py collectstatic
   ```

3. **Set up production database**:
   - Configure PostgreSQL/MySQL in settings.py
   - Run migrations

4. **Deploy**:
   - Use platforms like Heroku, PythonAnywhere, or VPS
   - Configure WSGI server (Gunicorn recommended)

## Troubleshooting

### Common Issues

1. **Server won't start**:
   - Check if virtual environment is activated
   - Verify all dependencies are installed
   - Check for port conflicts

2. **Email not working**:
   - Verify email credentials
   - Check if "Less secure apps" is enabled (Gmail)
   - Use app-specific passwords for Gmail

3. **Static files not loading**:
   - Run `python manage.py collectstatic`
   - Check STATIC_URL and STATIC_ROOT settings

4. **Database errors**:
   - Delete `db.sqlite3` and re-run migrations
   - Check file permissions

## Support

For any issues or questions:
- Email: risingrishav2321@gmail.com
- GitHub: https://github.com/rishavv30

## License

This project is open-source and available under the MIT License.
