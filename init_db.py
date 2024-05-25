import os
import django
from django.core.management import call_command

# Thiết lập biến môi trường Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FOF.settings')
django.setup()

# Sau khi cấu hình Django, bạn có thể sử dụng các chức năng liên quan đến database
from django.db import connection

def initialize_db():
    with connection.cursor() as cursor:
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        if not cursor.fetchall():
            call_command('migrate')
            # Thêm dữ liệu ban đầu nếu cần
            # Ví dụ: call_command('loaddata', 'initial_data.json')

initialize_db()
