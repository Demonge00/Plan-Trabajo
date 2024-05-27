from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Workplans, Activity


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('name', "email", 'id', "is_staff", "is_active",
                    'date_joined', 'sent_verification_email', 'verificated')
    list_filter = ('name', "email", 'id', "is_staff", "is_active",
                   'date_joined', 'sent_verification_email', 'verificated')
    fieldsets = (
        (None, {"fields": ('name', "email", "password",
         'sent_verification_email', 'verificated', 'date_joined')}),
        ("Permissions", {"fields": ("is_staff",
         "is_active")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
         ),
    )
    search_fields = ("email",)
    ordering = ("email",)


class ActivityAdmin(admin.ModelAdmin):
    list_display = [Activity.__str__, 'day', 'turn', 'activity']
    fields = ['day', 'turn', 'activity', 'workplans']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Workplans)
admin.site.register(Activity, ActivityAdmin)
