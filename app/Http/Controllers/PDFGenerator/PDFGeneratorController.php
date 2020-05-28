<?php

namespace App\Http\Controllers\PDFGenerator;

use App\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade as PDF; //importante facade

class PDFGeneratorController extends Controller
{
    public function generarPDF(Request $request){

        $namespace = "App\\{$request->type}"; //doble slash para escapar el primero

        $Modelo = resolve($namespace);

        $model = $Modelo::find($request->id);

        $this->createPDF(strtolower($request->type), $model);
    
        return response()->download(public_path('/pdfs/test.pdf'));
    }


    public function createPDF($tipo, $model, $titulo = "Agrege un título", $logo = "6.jpg"){

        $data = [
            'titulo' => $titulo,
            'fecha' => Carbon::now()->format('d-m-Y'),
            'student' => $model,
            'logo' => $logo
        ];

        $pdf = PDF::loadView("pdf-templates.{$tipo}-report", $data);

        $pdf->setPaper('a4', 'landscape');
    
        $pdf->save( public_path() . '/pdfs/test.pdf'); //Podría guarda en cloudinary o algun server externo
    }
}
