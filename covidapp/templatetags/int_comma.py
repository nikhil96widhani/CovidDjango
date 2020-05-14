from django import template

register = template.Library()


@register.filter(name='int_comma')
def int_comma(value):
    '''Add comma to every 3rd digit. Takes int or float and
    returns string.'''
    if type(value) == int:
        return '{:,}'.format(value)
    elif type(value) == float:
        return '{:,.2f}'.format(value)  # Rounds to 2 decimal places
    else:
        try:
            return '{:,}'.format(int(value))
        except:
            return 'N/A'
