from pytrends.request import TrendReq
import json
from django.http import HttpResponse

def getTrend(request):

	# Login to Google. Only need to run this once, the rest of requests will use the same session.
	pytrend = TrendReq()

	# Create payload and capture API tokens. Only needed for interest_over_time(), interest_by_region() & related_queries()
	pytrend.build_payload(kw_list=[str(request.GET['word'])])

	# Interest Over Time
	interest_over_time_df = pytrend.interest_over_time()
	
	return HttpResponse(interest_over_time_df.to_json(orient = "table"))

