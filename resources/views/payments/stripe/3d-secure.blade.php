@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Completa los Pasos de Seguridad</div>
                <div class="card-body">
                    Tu necesitas completar unos pasos adicionales con tu banco..
                </div>
            </div> 
        </div>
    </div>
</div>
@push('scripts')
<script src="https://js.stripe.com/v3/"></script>
<script>
    console.log('{{ $client_secret }}')
    const stripe = Stripe('{{ config('services.stripe.key')}}');
    stripe.handleCardAction('{{ $client_secret }}').then( res => {
        if(res.error){
            window.location.replace("{{ route('cancelled') }}");
        }else{
            window.location.replace("{{ route('approval') }}");
        }
    });
</script>
@endpush
@endsection
