class Task1(object):
    def __init__(self, **kwargs):
        for field in ('year', 'count'):
            setattr(self, field, kwargs.get(field, None))