from rest_framework import viewsets
from .models import Status, Type, Category, SubCategory, CashFlowRecord
from .serializers import (
    StatusSerializer, TypeSerializer,
    CategorySerializer, SubCategorySerializer,
    CashFlowRecordSerializer
)

class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class CashFlowRecordViewSet(viewsets.ModelViewSet):
    queryset = CashFlowRecord.objects.all().order_by('-date')
    serializer_class = CashFlowRecordSerializer