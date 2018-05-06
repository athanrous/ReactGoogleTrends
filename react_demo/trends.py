from django.http import HttpResponse


def data(request):
	return HttpResponse("Trends is called")


	