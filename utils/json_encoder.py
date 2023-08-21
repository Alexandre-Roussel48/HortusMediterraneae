import json
import datetime
from json import JSONEncoder

class DateTimeEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return str(obj.day) + '/' + str(obj.month) + '/' + str(obj.year)