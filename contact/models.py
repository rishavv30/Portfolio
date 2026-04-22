from django.db import models
from django.utils import timezone


class ContactSubmission(models.Model):
    """
    Model to store contact form submissions
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self):
        return f"{self.name} - {self.subject}"

    @property
    def short_message(self):
        """Return a shortened version of the message for admin display"""
        return self.message[:100] + "..." if len(self.message) > 100 else self.message
