<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Document\Article;
use FOS\RestBundle\Controller\Annotations\View;

/**
 * 
 */
class ArticleController extends Controller
{
    /**
     * @Route("/preview/article/{id}")
     * @View
     */
    public function previewAction(Article $article)
    {
        return array('article' => $article);
    }
}
