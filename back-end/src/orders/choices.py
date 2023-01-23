from django.utils.translation import gettext_lazy as _

READY_TO_SHIP = 'ready_to_ship'
SENDING = 'sending'
SENT = 'sent'
ORDER_STATUS = [
    (READY_TO_SHIP, _('ready_to_ship')),
    (SENDING, _('sending')),
    (SENT, _('sent')),
]
