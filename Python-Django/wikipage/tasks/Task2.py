class Task2(object):
    def __init__(self, **kwargs):
        for field in ('name', 'total','totalPerSection'):
            setattr(self, field, kwargs.get(field, None))