<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

</head>
<body>
    <div id="app">
      <div class="container-fluid">
        <p class="float-right">Fecha: {{ $fecha }}</p>
        <div class="row align-items-start">
          <div class="col-5">
            <h2 class="text-center">{{ $titulo }}</h2>
          </div>
          <div class="col-7">
            <img src="{{ asset("img/avatars/$logo") }}" class="rounded">
          </div>
     
        </div>
        <div class="row align-items-center">
          <div class="col">
            <p><strong>Nombre: </strong>{{ $student->name }}</p>
            <p><strong>Promoción: </strong>{{ $student->promotion->name }}</p>
    
                <table class="table table-bordered">
                  <thead class="thead-dark">
                    <tr class="text-center">
                      <th scope="col">Módulo</th>
                      <th scope="col">Solictud</th>
                      <th scope="col">Memorandum</th>
                      <th scope="col">Informe</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach($student->moduls as $modul)
                    <tr class="text-center">
                      <td>{{ $modul->name }}</td>
                      <td>{{ $modul->solicitud }}</td>
                      <td>{{ $modul->memorandum }}</td>
                      <td>{{ $modul->informe ?: 0 }} Horas</td>
                    </tr>
                    @endforeach
                  </tbody>
                </table>
          </div>
        </div>
      </div>
    </div>
</body>
</html>



