<?php

namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\RouteResource;

use App\Document\Article;

/**
 * @RouteResource("Document")
 */
class DocumentController
{

    /**
     * @View(SerializerGroups={"Editor"})
     * 
     * @param \App\Document\Article $article
     */
    public function postVersionAction($id)
    {
        return $article;
    }

    /**
     * @View
     * @param \Symfony\Component\HttpFoundation\Request $request
     */
    public function cpostAction(Request $request)
    {
        
    }
}
