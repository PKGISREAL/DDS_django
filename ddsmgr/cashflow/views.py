import requests
from django.shortcuts import render
from .models import CashFlowRecord, Status, Type, Category, SubCategory


def record_list(request):
    records = CashFlowRecord.objects.all()

    # фильтры из request.GET
    date = request.GET.get("date")
    type_id = request.GET.get("type")
    category_id = request.GET.get("category")
    subcategory_id = request.GET.get("subcategory")
    status_id = request.GET.get("status")

    if date:
        records = records.filter(date=date)
    if type_id:
        records = records.filter(type_id=type_id)
    if category_id:
        records = records.filter(category_id=category_id)
    if subcategory_id:
        records = records.filter(subcategory_id=subcategory_id)
    if status_id:
        records = records.filter(status_id=status_id)

    # справочники
    types = Type.objects.all()
    categories = Category.objects.all()
    subcategories = SubCategory.objects.all()
    statuses = Status.objects.all()

    return render(request, "cashflow/record_list.html", {
        "records": records,
        "types": types,
        "categories": categories,
        "subcategories": subcategories,
        "statuses": statuses,
    })


def record_create(request):
    return render(request, "cashflow/record_form.html")


def reference_panel(request):
    statuses = requests.get("http://127.0.0.1:8000/api/statuses/").json()
    types = requests.get("http://127.0.0.1:8000/api/types/").json()
    categories = requests.get("http://127.0.0.1:8000/api/categories/").json()
    subcategories = requests.get("http://127.0.0.1:8000/api/subcategories/").json()

    return render(request, "cashflow/reference_panel.html", {
        "statuses": statuses,
        "types": types,
        "categories": categories,
        "subcategories": subcategories
    })


def record_edit(request, pk):
    return render(request, "cashflow/record_form.html", {"record_id": pk})