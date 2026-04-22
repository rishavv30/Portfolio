from django.contrib import admin
from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """
    Admin interface for ContactSubmission model
    """
    list_display = ['name', 'email', 'subject', 'short_message', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    list_editable = ['is_read']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('is_read', 'created_at')
        }),
    )
    
    def mark_as_read(self, request, queryset):
        """Mark selected submissions as read"""
        queryset.update(is_read=True)
        self.message_user(request, f"{queryset.count()} submissions marked as read.")
    mark_as_read.short_description = "Mark selected as read"
    
    def mark_as_unread(self, request, queryset):
        """Mark selected submissions as unread"""
        queryset.update(is_read=False)
        self.message_user(request, f"{queryset.count()} submissions marked as unread.")
    mark_as_unread.short_description = "Mark selected as unread"
    
    actions = [mark_as_read, mark_as_unread]
