<?php
namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Controller\Controller as AppController;


/**
 * 
 */
class ArticleController extends AppController
{
    
    public function newAction(Request $request)
    {
        $dm = $this->get('dm');
        var_dump($request->attributes->all(), $dm);
    }
}
