# app/middleware/middleware.py

from django.utils.deprecation import MiddlewareMixin
from ipaddress import ip_address, ip_network
from django.http import HttpResponseForbidden
from django.urls import reverse
CLOUDFLARE_IP_RANGES = [
    '173.245.48.0/20',
    '103.21.244.0/22',
    '103.22.200.0/22',
    '103.31.4.0/22',
    '141.101.64.0/18',
    '108.162.192.0/18',
    '190.93.240.0/20',
    '188.114.96.0/20',
    '197.234.240.0/22',
    '198.41.128.0/17',
    '162.158.0.0/15',
    '104.16.0.0/12',
    '172.64.0.0/13',
    '131.0.72.0/22'
]

class CloudflareMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if 'HTTP_CF_CONNECTING_IP' in request.META:
            request.META['REMOTE_ADDR'] = request.META['HTTP_CF_CONNECTING_IP']
        return None


# app/middleware.py

class CloudflareCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if 'HTTP_CF_CONNECTING_IP' in request.META:
            request.META['REMOTE_ADDR'] = request.META['HTTP_CF_CONNECTING_IP']
        ip = ip_address(request.META['REMOTE_ADDR'])
        if any(ip in ip_network(cf_ip) for cf_ip in CLOUDFLARE_IP_RANGES):
            setattr(request, '_dont_enforce_csrf_checks', True)
        return None

class AdminIPWhitelistMiddleware:
       def __init__(self, get_response):
           self.get_response = get_response
           self.allowed_ip = '14.169.16.171'

       def __call__(self, request):
           admin_path = reverse('admin:index')
           if request.path.startswith(admin_path):
               client_ip = request.META['REMOTE_ADDR']
               if client_ip != self.allowed_ip:
                   return HttpResponseForbidden('Access denied.')
           response = self.get_response(request)
           return response