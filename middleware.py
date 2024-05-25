# app/middleware/middleware.py

from django.utils.deprecation import MiddlewareMixin
from ipaddress import ip_address, ip_network

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

class CloudflareCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        ip = ip_address(request.META['REMOTE_ADDR'])
        if any(ip in ip_network(cf_ip) for cf_ip in CLOUDFLARE_IP_RANGES):
            setattr(request, '_dont_enforce_csrf_checks', True)
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

