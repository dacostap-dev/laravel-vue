@extends('layouts.app')

@section('content')
<div class="container">
    <payment-processor :mercadopago_key="'{{ config('services.mercadopago.key') }}'" :mercadopago_currency="'{{ config('services.mercadopago.base_currency') }}'"/>
</div>
@endsection

@push('scripts')
<script src="https://js.stripe.com/v3/"></script>
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
@endpush