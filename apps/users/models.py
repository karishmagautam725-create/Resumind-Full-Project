from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, full_name, email, password=None):

        if not email:
            raise ValueError("Email is required")

        if not full_name:
            raise ValueError("Full name is required")

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, full_name, email, password=None):

        user = self.create_user(
            email=self.normalize_email(email),
            full_name=full_name,
            password=password
        )

        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True

        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):

    PLAN_CHOICES = (
        ("free", "Free"),
        ("pro", "Pro"),
        ("premium", "Premium"),
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)

    plan_type = models.CharField(
        max_length=20,
        choices=PLAN_CHOICES,
        default="free"
    )

    credit_remaining = models.PositiveIntegerField(default=5)

    is_admin = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

