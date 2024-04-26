from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('name', "email", "is_staff", "is_active",
                    'date_joined', 'sent_verification_email', 'verificated')
    list_filter = ('name', "email", "is_staff", "is_active",
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


admin.site.register(CustomUser, CustomUserAdmin)
