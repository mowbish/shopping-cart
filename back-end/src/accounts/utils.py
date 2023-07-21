from random import choices

def otp_generator():
    chars = "123456789"
    return "".join(choices("1234567890", k=6))


if __name__ == "__main__":
    otp_generator()
