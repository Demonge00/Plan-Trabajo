# Generated by Django 5.0.4 on 2024-05-24 20:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Workplans', '0003_customuser_password_secret'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workplans',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('custom_user', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.IntegerField()),
                ('turn', models.IntegerField()),
                ('activity', models.CharField(default='Auto Preparación', max_length=200)),
                ('workplans', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dayplans', to='Workplans.workplans')),
            ],
            options={
                'ordering': ['day', 'turn'],
            },
        ),
    ]
