<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use App\Document\Article;
use FOS\RestBundle\Controller\Annotations\View;

/**
 * 
 */
class ArticleController extends Controller
{
    /**
     * @Route("/preview/article/{id}")
     */
    public function previewAction(Article $article)
    {
        return $this->render('App:Article:preview.html.twig', array('article' => $article));
    }
}
