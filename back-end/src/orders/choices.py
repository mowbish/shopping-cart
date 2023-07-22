from django.utils.translation import gettext_lazy as _

READY_TO_SHIP = "ready_to_ship"
SENDING = "sending"
SENT = "sent"
SENDING_STATUS = [
    (READY_TO_SHIP, _("ready_to_ship")),
    (SENDING, _("sending")),
    (SENT, _("sent")),
]


ADDED_TO_CART = "ADDED_TO_CART"
SUCCESS = "SUCCESS"
FAIL = "FAIL"

PAYMENT_STATUS = [
    (ADDED_TO_CART, _("ADDED_TO_CART")),
    (SUCCESS, _("SUCCESS")),
    (FAIL, _("FAIL")),
]
