from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactSubmission
from .forms import ContactForm


def contact_view(request):
    """
    Handle contact form submissions
    """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save the contact submission
            contact_submission = form.save()
            
            # Send email notification (optional)
            try:
                subject = f"New Contact Form Submission: {contact_submission.subject}"
                message = f"""
                Name: {contact_submission.name}
                Email: {contact_submission.email}
                Subject: {contact_submission.subject}
                
                Message:
                {contact_submission.message}
                
                Submitted at: {contact_submission.created_at.strftime('%Y-%m-%d %H:%M:%S')}
                """
                
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.DEFAULT_FROM_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the submission
                print(f"Failed to send email: {e}")
            
            # Return JSON response for AJAX requests
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': True,
                    'message': 'Thank you for your message! I will get back to you soon.'
                })
            
            # Add success message and redirect for regular form submission
            messages.success(
                request, 
                'Thank you for your message! I will get back to you soon.'
            )
            return redirect('home')
        else:
            # Return JSON response for AJAX requests with errors
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False,
                    'errors': form.errors
                })
    
    else:
        form = ContactForm()
    
    return render(request, 'contact/contact.html', {'form': form})


@csrf_exempt
@require_http_methods(["POST"])
def submit_contact_api(request):
    """
    API endpoint for contact form submission
    """
    form = ContactForm(request.POST)
    
    if form.is_valid():
        # Save the contact submission
        contact_submission = form.save()
        
        # Send email notification
        try:
            subject = f"New Contact Form Submission: {contact_submission.subject}"
            message = f"""
            Name: {contact_submission.name}
            Email: {contact_submission.email}
            Subject: {contact_submission.subject}
            
            Message:
            {contact_submission.message}
            
            Submitted at: {contact_submission.created_at.strftime('%Y-%m-%d %H:%M:%S')}
            """
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")
        
        return JsonResponse({
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.',
            'submission_id': contact_submission.id
        })
    else:
        return JsonResponse({
            'success': False,
            'errors': form.errors
        }, status=400)


def contact_success(request):
    """
    Display success page after form submission
    """
    return render(request, 'contact/success.html')
