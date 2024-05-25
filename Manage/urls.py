from django.contrib import admin
from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth import views as auth_views


urlpatterns = [

    path('get-weather/', views.get_weather, name='get_weather'),
    # INDEX 
    path('', views.index, name="index"),

    # TRANG THÔNG BÁO
    path('notify', views.notify, name="notify"),
    
    # LOGIN SIGNUP 
    path('logins', views.logins, name='logins'),
    path('Logout_page', views.Logout_page, name='Logout_page'),
    path('signup', views.signup, name='signup'),
    path('userin4', views.userin4, name='userin4'),
    path('social/signup/', views.signup_redirect, name='signup_redirect'),

    # Reset password
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='Manage/password_reset_form.html', email_template_name='Manage/password_reset_email.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='Manage/password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='Manage/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='Manage/password_reset_complete.html'), name='password_reset_complete'),
    
    # MANAGE 
    path('manage', views.manage, name='manage'), 
    path('create', views.m_form, name="create"),
    path('create/land', views.land_form, name="land"),
    path('create/plant', views.plant_form, name="plant"),

    # API
    path('api/get-season-info/<int:season_id>/', views.get_season_info, name='get_season_info'),
    path('api/get-land-by-season/<int:season_id>/', views.get_land_by_season, name='get-land-by-season'),
    path('api/get-land-info/<int:land_id>/', views.get_land_info, name='get-land-info'),
    path('api/get-plant-by-land/<int:land_id>/', views.get_plant_by_land, name='get-plant-by-land'),
    path('api/get-plantmode/', views.get_plant_from_mode, name='get-mode-plant'),
    path('api/delete-season/<int:season_id>/', views.delete_season, name='delete_season'),
    path('api/update-season/<int:season_id>/', views.update_season_info, name='update_season'),
    path('api/delete-land/<int:land_id>/', views.delete_land, name='delete_land'),
    path('api/update_land/<int:land_id>/', views.update_land, name = 'update_land'),
    path('api/delete-plant/<int:plant_id>/', views.delete_plant, name='delete_plant'),
    path('api/update_plant/<int:land_id>/', views.update_plant, name = 'update_plant'),

    
    
    
    # RESOURCE
    path('searchname', views.searchname, name='searchname'),
    path('searchadr', views.searchadr, name='searchadr'),

    # MARKET 
    path('maker', views.maker, name="maker"),
    path('makerplant', views.makerplant, name="makerplant"),
    path('makeradr', views.makeradr, name="makeradr"),
    path('maker/detail/<int:market_id>', views.market_detail, name="makerDetail"),
    path('maker_sell', views.maker_sell, name="maker_sell"),
    
   
    # CONTACT 
    path('contact', views.contact, name="contact"),
    path('aboutus', views.aboutus, name="aboutus"),
    path('subscribe', views.send_subscription_email, name='subscribe'),   

    #FOOTER
    path('dksd', views.dksd, name="dksd"),
    path('csrt', views.csrt, name="csrt"),
    path('feedback', views.feedback, name="feedback"),



  
]

# Tạo một danh sách mới chỉ chứa urlpatterns cho đường dẫn 'search'
search_urlpatterns = [
    path('search', views.search, name='search'),
]

# Kết hợp static settings chỉ cho search_urlpatterns
search_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns+=search_urlpatterns

