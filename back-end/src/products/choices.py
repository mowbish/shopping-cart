from django.utils.translation import gettext_lazy as _

RED = "READY_TO_SHIP"
BLUE = "SENDING"
GREEN = "SENT"
BLACK = "BLACK"
WHITE = "WHITE"
PINK = "PINK"
ORANGE = "ORANGE"
YELLOW = "YELLOW"
PURPLE = "PURPLE"

COLOR_CHOICES = [
    (RED, _("RED")),
    (BLUE, _("BLUE")),
    (GREEN, _("GREEN")),
    (BLACK, _("BLACK")),
    (WHITE, _("WHITE")),
    (PINK, _("PINK")),
    (ORANGE, _("ORANGE")),
    (YELLOW, _("YELLOW")),
    (PURPLE, _("PURPLE")),
]
