import requests
from django.shortcuts import render


def record_list(request):
    base = "http://127.0.0.1:8000/api"

    def get_json_safe(url):
        try:
            res = requests.get(url)
            res.raise_for_status()
            return res.json()
        except Exception as e:
            print(f"Ошибка получения {url}: {e}")
            return []

    records = get_json_safe(f"{base}/cashflow/")
    statuses = get_json_safe(f"{base}/statuses/")
    types = get_json_safe(f"{base}/types/")
    categories = get_json_safe(f"{base}/categories/")
    subcategories = get_json_safe(f"{base}/subcategories/")

    # строим ID → name словари
    status_map = {s['id']: s['name'] for s in statuses}
    type_map = {t['id']: t['name'] for t in types}
    category_map = {c['id']: c['name'] for c in categories}
    subcategory_map = {sc['id']: sc['name'] for sc in subcategories}

    # обогащаем записи
    for r in records:
        r['status_name'] = status_map.get(r.get('status'), '—')
        r['type_name'] = type_map.get(r.get('type'), '—')
        r['category_name'] = category_map.get(r.get('category'), '—')
        r['subcategory_name'] = subcategory_map.get(r.get('subcategory'), '—')

    return render(request, "cashflow/record_list.html", {"records": records})


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