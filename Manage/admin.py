from django.contrib import admin
from .models import *
# Register your models here.
class thitruongAdmin(admin.ModelAdmin):
    list_display=('id_thitruong', 'id_caytrong', 'ten_caytrong','ten_thitruong','ten_nguoiban','gia')
    search_fields=['ten_caytrong']

admin.site.register(market)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Season)
admin.site.register(Land)
admin.site.register(Plant)
admin.site.register(Contact)
admin.site.register(Adress)
admin.site.register(notify_market)
admin.site.register(Plant_Mode)
