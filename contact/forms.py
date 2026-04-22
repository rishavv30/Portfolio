from django import forms
from .models import ContactSubmission


class ContactForm(forms.ModelForm):
    """
    Form for handling contact submissions
    """
    
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your Email',
                'required': True
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Subject',
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Your Message',
                'rows': 5,
                'required': True
            }),
        }

    def clean_email(self):
        """Custom email validation"""
        email = self.cleaned_data.get('email')
        if email:
            # Basic email validation
            if '@' not in email or '.' not in email:
                raise forms.ValidationError("Please enter a valid email address.")
        return email

    def clean_message(self):
        """Custom message validation"""
        message = self.cleaned_data.get('message')
        if message:
            if len(message) < 10:
                raise forms.ValidationError("Message must be at least 10 characters long.")
        return message
