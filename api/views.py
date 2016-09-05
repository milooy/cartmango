from .serializers import ProductSerializer
from product.models import Product
from rest_framework.decorators import api_view
from rest_framework import (serializers, permissions, status, viewsets)
from django.http import HttpResponse, Http404


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = (permissions.IsAdminUser,)


@api_view(['POST'])
def add_product(request):
    name = request.data.get('name', None)
    price = request.data.get('price', None)
    mall = request.data.get('mall', None)
    thumbnail_url = request.data.get('thumbnail_url', None)
    return HttpResponse(name + '제품을 장바구니에 저장했습니다.', status=200)


# @api_view(['POST'])
# def closing_excute(request):
#     closing_month_str = request.data.get('end', None)
#     if not closing_month_str:
#         return HttpResponse('마감할 월을 반드시 입력해 주세요.', status=400)
#     closing_month_day = arrow.get(closing_month_str, 'YYYY-MM').date()
#     next_month_day = arrow.get(closing_month_day).replace(months=+1).date()
#
#     # if before_more_than_one_month(closing_month_day):
#     #     return HttpResponse('직전 회기에 대해서만 마감할 수 있습니다.', status=400)
#
#     if ClosingReport.has_already_closing(closing_month_day):
#         return HttpResponse('이미 마감한 회기입니다. 마감장을 다시 만들려면, 기존 마감장을 삭제해주세요.', status=400)
#
#     closing_report = ClosingReport.objects.create(
#         creator=request.user,
#         month=closing_month_day,
#     )
#
#     df = Invoice.get_df_for_closing(
#         month=closing_month_day
#     )
#     closing_report.df_save(df=df)
#
#     MonthlyBaseStock.generate_bases(df=df, month=next_month_day)
#
#     return HttpResponse('마감 작업을 잘 마쳤습니다.', status=200)