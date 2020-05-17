@extends('layouts.app')

@section('content')
<div class="container">
    <payment-processor/>
</div>
@endsection

@push('scripts')
<script src="https://js.stripe.com/v3/"></script>
@endpush