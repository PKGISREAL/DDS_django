from rest_framework.routers import DefaultRouter
from .api_views import (
    StatusViewSet, TypeViewSet,
    CategoryViewSet, SubCategoryViewSet,
    CashFlowRecordViewSet
)
from django.urls import path, include

from .views import record_list, record_create, reference_panel, record_edit

router = DefaultRouter()
router.register(r'statuses', StatusViewSet)
router.register(r'types', TypeViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'cashflow', CashFlowRecordViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]


urlpatterns += [
    path('', record_list, name='record-list'),
    path('create/', record_create, name='record-create'),
    path('references/', reference_panel, name='reference-panel'),
    path('edit/<int:pk>/', record_edit, name='record-edit'),
]